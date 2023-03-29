import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { Label } from '@vitruvio/ui';
import { useVitruvio } from '@vitruvio/react';
import { useAccount } from 'wagmi';
import { useUI } from '@vitruvio/ui';

const Page: NextPage = () => {
  const { isConnected } = useAccount();
  const { encrypt, decrypt } = useVitruvio();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [encryptedString, setEncryptedString] = useState<Blob>();
  const [encryptedSymmetricKey, setEncryptedSymmetricKey] = useState<string>();
  const { Connect } = useUI();

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  return (
    <>
      <Label text='Sample lit protocol' />
      <Connect />
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
