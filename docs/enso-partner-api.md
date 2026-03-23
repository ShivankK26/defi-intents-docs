---
sidebar_position: 5
---

# Defi Shortcuts API

This document describes the API endpoints for the **Shortcut routing**.

## Base URL

`https://api.defiintents.store` (local testing: `http://localhost:3000`)

## Authentication (partner whitelist)

All routes **require** a partner API key except `GET /`.

Partners must include **one** of the following headers:

- `X-API-Key: <partner-key>`
- `Authorization: Bearer <partner-key>`

Your server validates the key against `PARTNER_API_KEYS` (comma-separated) in its environment.

## Endpoints

### Integration metadata

1. **Networks**
   - `GET /networks`

2. **Aggregators**
   - `GET /aggregators`

3. **Tokens**
   - `GET /tokens`
   - Query params are pre-defined (pass filters like `chainId` / `address` if needed).

4. **Protocols**
   - `GET /protocols`

5. **Standards**
   - `GET /standards`

6. **Actions**
   - `GET /actions`

7. **Projects**
   - `GET /projects`

### Wallet balances

8. **Wallet balances**
   - `GET /wallet/balances`
   - Query params are pre-defined (commonly wallet `address` and `chainId`).

### Shortcuts (optimal route)

9. **Shortcuts route (optimal swap route)**
   - `GET /shortcuts/route`
   - Query params are pre-defined by “Shortcuts” API.

Example:
```bash
curl -s -i \
  -H "X-API-Key: <partner-key>" \
  "http://api.defiintents.store/shortcuts/route?chainId=1&tokenIn=<TOKEN_IN>&tokenOut=<TOKEN_OUT>&amountIn=<AMOUNT_IN>&slippageBps=<BPS>&routingStrategy=<STRATEGY>"
```

