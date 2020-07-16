export const mockStarageValues = () => {
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: 'id',
        token: 'tokenString',
        expiration: new Date(new Date().getTime() + 1000 * 60)
      })
    );
  };