import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { Label } from '@vitruvio/ui';
import { useVitruvio, useWallet } from '@vitruvio/react';
import { Web3Button } from '@web3modal/react';
import { useAccount } from 'wagmi';

const Page: NextPage = () => {
  const { isConnected } = useAccount();
  const { signAuthMessage, isSigning } = useWallet();
  const { encrypt } = useVitruvio();
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    setHasLoaded(true);
  }, []);

  return (
    <>
      <Label />
      {hasLoaded ? <Web3Button /> : null}
      {isConnected && hasLoaded ? (
        <button
          disabled={isSigning}
          onClick={async () => {
            const authSig = await signAuthMessage();
            await encrypt(authSig);
          }}
        >
          Sign Message
        </button>
      ) : null}
    </>
  );
};

export default Page;
