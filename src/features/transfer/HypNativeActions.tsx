import { ChainName } from '@hyperlane-xyz/sdk';
import { useState } from 'react';
import { SolidButton } from '../../components/buttons/SolidButton';
import { TextField } from '../../components/input/TextField';
import { getWarpCore } from '../../context/context';

export function DepositLiquidityForm({ chainName }: { chainName: ChainName }) {
  const [amount, setAmount] = useState('');
  const warpCore = getWarpCore();

  const handleDeposit = async () => {
    try {
      await warpCore.depositNativeTokens(chainName, amount);
      // Handle success (e.g., show a success message, reset form)
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Error depositing liquidity:', error);
    }
  };

  return (
    <div>
      <h3>Deposit Bridge Liquidity</h3>
      <TextField
        name="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        type="number"
        classes="w-full"
      />
      <SolidButton onClick={handleDeposit}>Deposit</SolidButton>
    </div>
  );
}

export function ClaimFeesButton({ chainName }: { chainName: ChainName }) {
  const warpCore = getWarpCore();

  const handleClaimFees = async () => {
    try {
      await warpCore.claimFees(chainName);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return <SolidButton onClick={handleClaimFees}>Claim Fees</SolidButton>;
}

export function WithdrawLiquidityForm({ chainName }: { chainName: ChainName }) {
  const [shares, setShares] = useState('');
  const warpCore = getWarpCore();

  const handleWithdraw = async () => {
    try {
      await warpCore.withdrawBridgeLiquidity(chainName, shares);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h3>Withdraw Bridge Liquidity</h3>
      <TextField
        name="shares"
        value={shares}
        onChange={(e) => setShares(e.target.value)}
        placeholder="Shares"
        type="number"
        classes="w-full"
      />
      <SolidButton onClick={handleWithdraw}>Withdraw</SolidButton>
    </div>
  );
}