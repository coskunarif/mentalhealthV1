/**
 * Helper utility to identify execution environment
 */
export const isServer = typeof window === 'undefined';
export const isClient = !isServer;

// Used to prevent client-side imports of server-only code
export function preventClientImport(moduleName: string): void {
  if (isClient) {
    throw new Error(
      `Cannot import ${moduleName} on the client side. This module is server-only.`
    );
  }
}
