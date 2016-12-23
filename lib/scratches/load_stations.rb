require 'csv'
# download from http://www.ekidata.jp/ to tmp/downloads
"
# exec in console
load 'scratches/load_stations.rb'
loader = StationLoader.new


loader.load_lines

loader.load_stations
"


class StationLoader

  def load_lines
    lines = metoro_lines
    line_models = lines.map { |line| model_for_line(line) }

    puts line_models.join("\n")
  end

  def load_stations
    stations = metoro_stations
    station_models = stations.map { |station| model_for_station(station) }

    puts station_models.join("\n")
  end

  def metoro_lines
    line_data.select do |line|
      line[1] == '18'
    end
  end

  def line_ids
    @line_ids ||= metoro_lines.map { |line| line[0] }
  end

  def metoro_stations
    station_data.select do |station|
      line_ids.include?(station[5])
    end
  end

  def model_for_line(line)
    line_id = line[0]
    line_name = line[2]
    line_name_kana = line[3]
    <<"EOS"
Line.seed do |line|
  line.id = #{line_id}
  line.line_id = #{line_id}
  line.name = "#{line_name}"
  line.name_kana = "#{line_name_kana}"
end
EOS
  end

  def model_for_station(station)
    line_id = station[5]
    station_id = station[0]
    name = station[2]
    name_kana = station[3]
    <<"EOS"
Station.seed do |station|
  station.id = #{station_id}
  station.line_id = #{line_id}
  station.name = "#{name}"
  station.name_kana = "#{name_kana}"
end
EOS
  end

  def line_data
    return @line_data unless @line_data.nil?
    _, *@line_data = CSV.read('tmp/downloads/line20161107free.csv')
    @line_data
  end

  def station_data
    return @station_data unless @station_data.nil?
    _, *@station_data = CSV.read('tmp/downloads/station20161107free.csv')
    @station_data
  end

end
