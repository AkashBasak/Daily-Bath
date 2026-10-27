# Daily Bath website

Next.js (App Router, TypeScript, Tailwind CSS) site for the Daily Bath brand: Home, Products, Product Details, Brand Story and Contact.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the Supabase values
npm run dev                  # http://localhost:3000
```

Checks: `npm run lint`, `npx tsc --noEmit`, `npm run build`.

## Contact form and Supabase

Contact form submissions are validated on the server (`src/app/contact/actions.ts`) and saved to the `form_submissions` table in Supabase.

1. Create a Supabase project.
2. Apply the migration in `supabase/migrations/` (Supabase CLI `supabase db push`, or paste the SQL into the SQL editor).
3. Copy the project URL and anon/publishable key from **Project Settings → API** into `.env.local` (and your hosting provider's environment settings).
4. Rebuild and redeploy. `NEXT_PUBLIC_*` values are read at build time.

Without these settings the form still validates input, but shows visitors a "couldn't send" message with the email address instead of saving.

### Security model

- Row Level Security is enabled on `form_submissions`. The public (anon) role may **insert only**, and only the form's columns; it cannot read, change or delete rows. Admin access will be added with the admin panel.
- All input is validated and length-limited on the server; the database repeats the key checks as constraints.
- Spam controls: a hidden honeypot field and an in-memory rate limit of 5 messages per 10 minutes per IP address. The limiter only covers one server instance and trusts the `x-forwarded-for` header, so also enable your host's rate limiting / bot protection (e.g. Vercel Firewall) in production.
- Server Actions check the request origin, which protects the form against cross-site request forgery.
- Logs record only failure status codes, never submitted personal data.
- Never put a service-role key in a `NEXT_PUBLIC_*` variable.
