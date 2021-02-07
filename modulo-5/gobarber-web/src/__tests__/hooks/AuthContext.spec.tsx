import { renderHook } from '@testing-library/react-hooks';
import AxiosMockAdapter from 'axios-mock-adapter';

import api from '../../services/apiClient';
import { AuthProvider, useAuth } from '../../hooks/AuthContext';

const apiMock = new AxiosMockAdapter(api);

describe('AuthContext Hook', () => {
  it('should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: 'user_id',
        name: 'John Doe',
        email: 'johndoe@example.com',
      },
      token: 'token',
    };

    apiMock.onPost('/sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'johndoe@example.com',
      password: 'password',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user),
    );
    expect(result.current.user.email).toEqual('johndoe@example.com');
  });
});
