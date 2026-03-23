---
sidebar_position: 4
---

# Swap/Bridge API

This document describes the API endpoints for **Swap + Bridge**.


## Base URL

`https://api.defiintents.store` (local testing: `http://localhost:3000`)

## Authentication (partner whitelist)

All routes **require** a partner API key except `GET /`.

Partners must include **one** of the following headers:

- `X-API-Key: <partner-key>`
- `Authorization: Bearer <partner-key>`

Your server validates the key against `PARTNER_API_KEYS` (comma-separated) in its environment.

### Notes about params and token addresses

We're strict about `(chainId, tokenAddress)`:

- If you send a token address that is **not supported on the destination chain**, it will return an error (often `404`).
- Use:
  - `GET /swap/tokens`
  - `GET /available-routes`
  - `GET /swap/sources`
  to discover valid pairs.

## Endpoints

### Swap catalog

1. **Swap chains**
   - `GET /swap/chains`
   - Description: Supported chain list for swap/bridge operations.

2. **Swap tokens**
   - `GET /swap/tokens`
   - Description: Supported tokens list for swap/bridge operations.

3. **Swap sources**
   - `GET /swap/sources?chainId=<number>`
   - Description: Supported sources for swap operations on a given origin chain.

### Swap API (swap-bridge-swap approval data)

4. **Swap approval (quote + executable calldata)**
   - `GET /swap/approval`
   - Description: Returns the data needed to execute a cross-chain swap. The response includes executable transaction calldata (`swapTx`) and fee/step information.

   Required query parameters:
   - `tradeType`: `exactInput` | `minOutput` | `exactOutput`
   - `amount`
   - `inputToken` (origin token address)
   - `outputToken` (destination token address)
   - `originChainId`
   - `destinationChainId`
   - `depositor` (EOA initiating the deposit/swap)

   Example (you must use token addresses supported by the chosen chains):
   ```bash
   curl -s -i \
     -H "X-API-Key: <partner-key>" \
     "http://api.defiintents.store/swap/approval?tradeType=exactInput&amount=1000000&inputToken=<INPUT_TOKEN>&outputToken=<OUTPUT_TOKEN>&originChainId=1&destinationChainId=42161&depositor=<YOUR_WALLET>&recipient=<YOUR_WALLET>&slippage=auto"
   ```

### Bridge quote/fees

5. **Suggested fees**
   - `GET /suggested-fees`
   - Description: Quote data only for a bridge deposit (fee breakdown, limits, fill time, etc.).

   Required query parameters:
   - `inputToken`
   - `outputToken`
   - `originChainId`
   - `destinationChainId`
   - `amount`

   Example:
   ```bash
   curl -s -i \
     -H "X-API-Key: <partner-key>" \
     "http://api.defiintents.store/suggested-fees?inputToken=<INPUT_TOKEN>&outputToken=<OUTPUT_TOKEN>&originChainId=1&destinationChainId=42161&amount=1000000"
   ```

### Limits + route discovery

6. **Limits**
   - `GET /limits`
   - Description: Current transfer limits for a token pair between two chains.
   - Query params:
     - `inputToken`, `outputToken`, `originChainId`, `destinationChainId`

7. **Available routes**
   - `GET /available-routes`
   - Description: Available routes for transfers.
   - Query params:
     - `originChainId`, `destinationChainId`
     - optional: `originToken`, `destinationToken`

### Deposit tracking

8. **Deposit status**
   - `GET /deposit/status`
   - Description: Track the lifecycle of a deposit and get fill tx hash when filled.

   You can provide either:
   - `depositTxnRef` (required when using this approach)
   - OR `originChainId` + `depositId`

   Example:
   ```bash
   curl -s -i \
     -H "X-API-Key: <partner-key>" \
     "http://api.defiintents.store/deposit/status?depositTxnRef=<DEPOSIT_TX_HASH>"
   ```

9. **Deposits**
   - `GET /deposits`
   - Description: Get all deposits for a given depositor.
   - Query params:
     - `depositor` (optional)
     - `limit`, `skip` (optional)

