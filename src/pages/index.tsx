import { useChains } from '../features/chains/hooks/useChains';
import { ClaimFeesButton, DepositLiquidityForm, WithdrawLiquidityForm } from '../features/transfer/HypNativeActions';
import { TransferTokenForm } from '../features/transfer/TransferTokenForm';

export default function Home() {
  const { chains } = useChains();
  const destinationChain = chains[1]; // Assuming the second chain is the destination

  return (
    <div>
      <h1>Hyperlane Warp Route UI Template</h1>
      <TransferTokenForm />
      <div>
        <h2>HypNative Actions</h2>
        <DepositLiquidityForm chainName={destinationChain.name} />
        <ClaimFeesButton chainName={destinationChain.name} />
        <WithdrawLiquidityForm chainName={destinationChain.name} />
      </div>
    </div>
  );
}
