import { useAppDispatch, useAppSelector, useAuthSlice } from "@/store";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const setAuthLoading = (value: boolean) => {
    dispatch(useAuthSlice.setIsAuthenticating(value));
  };

  return {
    setAuthLoading,
  };
};

export default useAuth;
