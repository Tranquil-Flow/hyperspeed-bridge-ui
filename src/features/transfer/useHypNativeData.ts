import { ChainName } from '@hyperlane-xyz/sdk';
import { useQuery } from '@tanstack/react-query';
import { useToastError } from '../../components/toast/useToastError';
import { getWarpCore } from '../../context/context';

export function useHypNativeData(chainName: ChainName) {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['useHypNativeData', chainName],
    queryFn: async () => {
      const warpCore = getWarpCore();
      const hypNativeContract = await warpCore.getHypNativeContract(chainName);
      const [
        otherChainAvailableLiquidity,
        otherChainInsuranceFundAmount,
        pendingBridgeAmount
      ] = await Promise.all([
        hypNativeContract.otherChainAvailableLiquidity(),
        hypNativeContract.otherChainInsuranceFundAmount(),
        hypNativeContract.pendingBridgeAmount()
      ]);
      
      const maxBridgeableAmount = otherChainInsuranceFundAmount.sub(pendingBridgeAmount);
      
      return {
        otherChainAvailableLiquidity,
        otherChainInsuranceFundAmount,
        maxBridgeableAmount
      };
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  useToastError(error, 'Error fetching HypNative data');

  return { isLoading, isError, data };
}