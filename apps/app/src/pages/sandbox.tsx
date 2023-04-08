import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { Chain, Testnet } from '@vitruvio/types';
import { useUI } from '@vitruvio/ui';
import { useVitruvio } from '@vitruvio/react';
import { useAccount } from 'wagmi';
import { ListItemText, MenuItem, Select, Typography } from '@mui/material';

const Page: NextPage = () => {
  const { isConnected } = useAccount();
  const { encrypt, decrypt } = useVitruvio();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isTestnet, setIsTestnet] = useState(false);
  const [chain, SetChain] = useState<Chain | Testnet>('ethereum');
  const [encryptedString, setEncryptedString] = useState<Blob>();
  const [encryptedSymmetricKey, setEncryptedSymmetricKey] = useState<string>();
  const { Connect } = useUI();

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  return (
    <>
      <Typography variant='h3'>Sandbox</Typography>
      <Select>
        <MenuItem>
          <ListItemText primary='Ethereum' />
        </MenuItem>
      </Select>
      <Connect defaultChain='sepolia' />
      {isConnected && hasLoaded ? (
        <>
          <button
            onClick={async () => {
              const res = await encrypt(
                'This is a superstring encrypted with lit protocol'
              );
              console.log(res.encryptedSymmetricKey);
              console.log(res.encryptedString);
              setEncryptedString(res.encryptedString);
              setEncryptedSymmetricKey(res.encryptedSymmetricKey);
            }}
          >
            Sign Message
          </button>
          <button
            disabled={!encryptedString || !encryptedSymmetricKey}
            onClick={async () => {
              if (encryptedString && encryptedSymmetricKey) {
                try {
                  const decryptedData = await decrypt(
                    encryptedSymmetricKey,
                    encryptedString
                  );
                  console.log(decryptedData);
                } catch (error) {
                  console.log(error);
                }
              }
            }}
          >
            Decrypt my message
          </button>
        </>
      ) : null}
    </>
  );
};

export default Page;
