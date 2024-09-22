import { useHypNativeData } from './useHypNativeData';

interface HypNativeInfoSectionProps {
  destination: ChainName;
}

export function HypNativeInfoSection({ destination }: HypNativeInfoSectionProps) {
  const { isLoading, data } = useHypNativeData(destination);

  if (isLoading || !data) {
    return <div>Loading HypNative data...</div>;
  }

  const { otherChainAvailableLiquidity, otherChainInsuranceFundAmount, maxBridgeableAmount } = data;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">HypNative Information</h3>
      <div className="space-y-2">
        <p>Available Liquidity: {otherChainAvailableLiquidity.toString()} USD</p>
        <p>Insurance Fund: {otherChainInsuranceFundAmount.toString()} USD</p>
        <p>Max Bridgeable Amount: {maxBridgeableAmount.toString()} USD</p>
      </div>
    </div>
  );
}