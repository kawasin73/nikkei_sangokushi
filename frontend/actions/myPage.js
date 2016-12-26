const Actions = {
  INITIALIZED: 'myPage/initialized',
};

export default Actions;

export function initialized() {
  return {
    type: Actions.INITIALIZED,
  };
}
