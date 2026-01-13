'use client';

import { useState, useCallback } from 'react';

// Contract addresses (update after deployment)
const FACTORY_ADDRESS = '0xae13506deae7f82ea5c1c646d0b6693b220a4bb8';
const RPC_URL = 'http://127.0.0.1:8545'; // Local Anvil fork

// Types
interface PasskeyCredential {
  id: string;
  rawId: Uint8Array;
  publicKeyX: bigint;
  publicKeyY: bigint;
}

interface WalletInfo {
  address: string;
  credentialIdHash: string;
  credential: PasskeyCredential;
}

// Utility functions
function bytesToBase64Url(bytes: Uint8Array): string {
  const binary = String.fromCharCode(...bytes);
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function bytesToBigInt(bytes: Uint8Array): bigint {
  let result = 0n;
  for (const byte of bytes) {
    result = (result << 8n) | BigInt(byte);
  }
  return result;
}

function bytesToHex(bytes: Uint8Array): string {
  return '0x' + Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Extract P-256 public key from SPKI or COSE format
function extractP256PublicKey(publicKeyBytes: Uint8Array): { x: bigint; y: bigint } {
  // Raw uncompressed point format (65 bytes, starts with 0x04)
  if (publicKeyBytes.length === 65 && publicKeyBytes[0] === 0x04) {
    const x = bytesToBigInt(publicKeyBytes.slice(1, 33));
    const y = bytesToBigInt(publicKeyBytes.slice(33, 65));
    return { x, y };
  }

  // SPKI format (starts with 0x30, ASN.1 SEQUENCE)
  // The uncompressed point (0x04 + 32 bytes X + 32 bytes Y) is at the end
  if (publicKeyBytes[0] === 0x30) {
    // Find the 0x04 marker followed by 64 bytes of key
    for (let i = publicKeyBytes.length - 65; i >= 0; i--) {
      if (publicKeyBytes[i] === 0x04) {
        const x = bytesToBigInt(publicKeyBytes.slice(i + 1, i + 33));
        const y = bytesToBigInt(publicKeyBytes.slice(i + 33, i + 65));
        return { x, y };
      }
    }
  }

  // COSE format - look for 0x58 0x20 (CBOR byte string of 32 bytes)
  let x: bigint = BigInt(0);
  let y: bigint = BigInt(0);

  for (let i = 0; i < publicKeyBytes.length - 32; i++) {
    if (publicKeyBytes[i] === 0x58 && publicKeyBytes[i + 1] === 0x20) {
      const coord = publicKeyBytes.slice(i + 2, i + 34);
      if (x === BigInt(0)) {
        x = bytesToBigInt(coord);
      } else {
        y = bytesToBigInt(coord);
        break;
      }
    }
  }

  if (x === BigInt(0) || y === BigInt(0)) {
    throw new Error('Failed to extract public key from format');
  }

  return { x, y };
}

export default function Home() {
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const isSupported = typeof window !== 'undefined' &&
    window.PublicKeyCredential !== undefined;

  const createWallet = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    addLog('Starting wallet creation...');

    try {
      const userId = crypto.getRandomValues(new Uint8Array(16));

      addLog('Requesting passkey creation (check your browser)...');

      const credential = await navigator.credentials.create({
        publicKey: {
          rp: {
            id: window.location.hostname,
            name: 'Mantissa Demo',
          },
          user: {
            id: userId,
            name: 'demo@mantlepass.xyz',
            displayName: 'Demo User',
          },
          challenge: crypto.getRandomValues(new Uint8Array(32)),
          pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            residentKey: 'required',
            userVerification: 'required',
          },
          timeout: 60000,
          attestation: 'none',
        },
      }) as PublicKeyCredential;

      if (!credential) {
        throw new Error('Passkey creation cancelled');
      }

      addLog('Passkey created! Extracting public key...');

      const response = credential.response as AuthenticatorAttestationResponse;
      const publicKeyBytes = response.getPublicKey();

      if (!publicKeyBytes) {
        throw new Error('Failed to get public key');
      }

      const { x, y } = extractP256PublicKey(new Uint8Array(publicKeyBytes));

      const credentialInfo: PasskeyCredential = {
        id: bytesToBase64Url(new Uint8Array(credential.rawId)),
        rawId: new Uint8Array(credential.rawId),
        publicKeyX: x,
        publicKeyY: y,
      };

      const hashBuffer = await crypto.subtle.digest('SHA-256', credential.rawId);
      const credentialIdHash = bytesToHex(new Uint8Array(hashBuffer));
      const mockAddress = '0x' + credentialIdHash.slice(2, 42);

      const walletInfo: WalletInfo = {
        address: mockAddress,
        credentialIdHash,
        credential: credentialInfo,
      };

      setWallet(walletInfo);
      addLog(`✅ Wallet created!`);
      addLog(`Address: ${mockAddress}`);
      addLog(`Public Key X: ${x.toString(16).slice(0, 20)}...`);
      addLog(`Public Key Y: ${y.toString(16).slice(0, 20)}...`);

    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError(msg);
      addLog(`❌ Error: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signMessage = useCallback(async () => {
    if (!wallet) return;

    setIsLoading(true);
    addLog('Requesting signature (check your browser)...');

    try {
      const challenge = new TextEncoder().encode('Hello Mantissa!');

      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge: challenge.buffer as ArrayBuffer,
          rpId: window.location.hostname,
          userVerification: 'required',
          timeout: 60000,
        },
      }) as PublicKeyCredential;

      if (!assertion) {
        throw new Error('Signing cancelled');
      }

      const response = assertion.response as AuthenticatorAssertionResponse;

      addLog('✅ Message signed!');
      addLog(`Authenticator Data: ${bytesToHex(new Uint8Array(response.authenticatorData)).slice(0, 40)}...`);
      addLog(`Signature: ${bytesToHex(new Uint8Array(response.signature)).slice(0, 40)}...`);

    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError(msg);
      addLog(`❌ Error: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  }, [wallet]);

  const disconnect = () => {
    setWallet(null);
    setLogs([]);
    addLog('Disconnected');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-widest neon-text-glow font-sans uppercase">
          Seedless Smart Wallet
        </h1>
        <p className="text-[var(--text-secondary)] text-lg md:text-xl tracking-[0.2em] font-mono uppercase">
          Your passkeys, biometrics, and assets stay encrypted
        </p>
      </div>

      {/* Glass Card */}
      <div className="glass-card rounded-3xl p-1 w-full max-w-[520px] relative">
        <div className="bg-[rgba(2,13,8,0.4)] rounded-[20px] p-6 md:p-8 backdrop-blur-sm">

          {!isSupported ? (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4 text-5xl">⚠️</div>
              <p className="text-xl mb-2 text-red-400 font-mono">WebAuthn Not Supported</p>
              <p className="text-sm text-[var(--text-secondary)]">Please use a modern browser</p>
            </div>
          ) : !wallet ? (
            <div className="flex flex-col gap-6">
              {/* Info Display Mockup */}
              <div className="space-y-4">
                <div className="bg-[rgba(0,255,204,0.03)] border border-[rgba(0,255,204,0.1)] rounded-xl p-4 flex justify-between items-center">
                  <span className="text-[var(--text-secondary)] font-mono text-sm">NETWORK</span>
                  <span className="text-[var(--accent)] font-mono font-bold">MANTLE L2</span>
                </div>
                <div className="bg-[rgba(0,255,204,0.03)] border border-[rgba(0,255,204,0.1)] rounded-xl p-4 flex justify-between items-center">
                  <span className="text-[var(--text-secondary)] font-mono text-sm">SECURITY</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] neon-glow"></span>
                    <span className="text-[var(--accent)] font-mono font-bold">P-256 SECURE</span>
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(0,255,204,0.2)] to-transparent my-2" />

              <button
                onClick={createWallet}
                disabled={isLoading}
                className="w-full py-5 rounded-xl font-bold text-lg tracking-widest transition-all duration-300
                  bg-[var(--accent)] text-black hover:opacity-90 hover:scale-[1.02] neon-glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    CREATING...
                  </span>
                ) : 'CONNECT WALLET'}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Connected State */}
              <div className="bg-[rgba(0,255,204,0.05)] border border-[var(--accent)] rounded-xl p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent)] neon-glow" />

                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[rgba(0,255,204,0.1)] border border-[var(--accent)] flex items-center justify-center neon-glow">
                  <svg className="w-8 h-8 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <p className="text-[var(--text-secondary)] text-sm font-mono mb-1">CONNECTED WALLET</p>
                <p className="text-xl md:text-2xl font-mono text-white tracking-wider break-all">
                  {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={disconnect}
                  className="py-4 rounded-xl font-mono border border-[rgba(0,255,204,0.2)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
                >
                  DISCONNECT
                </button>
                <button
                  onClick={signMessage}
                  disabled={isLoading}
                  className="py-4 rounded-xl font-bold font-mono tracking-wide
                    bg-[rgba(0,255,204,0.1)] text-[var(--accent)] border border-[var(--accent)] hover:bg-[rgba(0,255,204,0.2)] neon-glow transition-all"
                >
                  {isLoading ? 'SIGNING...' : 'SIGN MSG'}
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 bg-[rgba(255,50,50,0.1)] border border-red-500/50 rounded-xl p-4 animate-in fade-in slide-in-from-top-2">
              <p className="text-red-400 text-sm font-mono text-center">Error: {error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Logs Console */}
      {logs.length > 0 && (
        <div className="mt-8 w-full max-w-[520px] glass-card rounded-xl p-4 overflow-hidden">
          <div className="flex justify-between items-center mb-2 px-2">
            <span className="text-[var(--accent)] font-mono text-xs tracking-widest uppercase">System Logs</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
          </div>
          <div className="bg-[rgba(0,0,0,0.5)] rounded-lg p-3 font-mono text-xs h-32 overflow-y-auto space-y-1 custom-scrollbar">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-[var(--text-secondary)] opacity-50">{log.split(']')[0]}]</span>
                <span className="text-[var(--foreground)]">{log.split(']')[1]}</span>
              </div>
            ))}
            <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-6 text-[var(--text-secondary)] text-xs font-mono tracking-widest opacity-60">
          <span>FACTORY: {FACTORY_ADDRESS.slice(0, 6)}...</span>
          <span>•</span>
          <span>RPC: LOCALHOST</span>
        </div>
      </div>
    </div>
  );
}
