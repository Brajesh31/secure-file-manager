# Security Policy

## Current security posture
This repository is a frontend prototype. It uses local mock data and browser state. The login check in `app/page.tsx` is a placeholder, not authentication. Client-side role state is not authorization. No claim of encryption, private storage, or secure sharing should be made based on the UI alone.

## Do not use with real sensitive files
Do not upload or enter confidential documents, personal data, credentials, financial records, or regulated information.

## Before production use
Implement server-side identity and access control, private storage, per-object authorization, safe upload/download handling, malware scanning, audit trails, encryption, rate limits, secure session handling, and tested backup/deletion workflows.

## Reporting
Do not disclose exploitable details publicly. Use GitHub private vulnerability reporting when available, or contact the repository owner privately with reproduction steps and impact.
