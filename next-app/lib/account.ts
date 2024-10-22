import { query } from "./database";

export type CustomerStatus = "inactive" | "active" | "suspended";

export interface Customer {
  accountId: number;
  firstName: string;
  lastName: string;
  email: string;
  status: CustomerStatus;
  wantsPromotions: boolean;
}

export interface Admin {
  accountId: number;
  employeeId: string;
  title: string;
}

export type CreateCustomerOpts = Omit<Customer & {password: string}, "accountId" | "state">;
export async function createCustomer(opts: CreateCustomerOpts): Promise<number> {
  const queryText = `
  WITH new_id AS (
    INSERT INTO account (password_hash)
    VALUES ($2)
    RETURNING id
  )
  INSERT INTO customer (account_id, email, first_name, last_name, wants_promotions, state)
  VALUES ((SELECT id FROM new_id), $1, $3, $4, $5, 'active')
  RETURNING account_id;
  `;

  // TODO: Hash!
  const passwordHash = opts.password;

  const values = [opts.email, passwordHash, opts.firstName, opts.lastName, opts.wantsPromotions];
  const res = await query(queryText, values);

  return res.rows[0].account_id as number;
}

export async function setCustomerStatus(accountId: number, status: CustomerStatus) {
  const queryText = `
  UPDATE customer
  SET state = $2
  WHERE account_id = $1;
  `;

  const values = [accountId, status];
  await query(queryText, values);
}

export async function compareCustomerLogin(email: string | undefined, providedPassword: string | undefined) {
  const queryText = `
  SELECT password_hash
  FROM account as a
  JOIN customer as c
  ON a.id = c.account_id
  WHERE c.email = $1;
  `;

  const values = [email];
  const res = await query(queryText, values);
  const storedPasswordHash = res.rows[0].password_hash;

  // TODO: Hash!
  const providedPasswordHash = providedPassword;

  // TODO: Compare hashes
  return res.rows[0].password_hash.toString('utf-8') === providedPassword;
}

export async function getCustomerAccountId(email: string | undefined, providedPassword: string | undefined) {
  const queryText = `
  SELECT a.id, a.password_hash
  FROM account as a
  JOIN customer as c
  ON a.id = c.account_id
  WHERE c.email = $1;
  `;

  const values = [email];
  const res = await query(queryText, values);

  if (res.rows.length === 0) {
    return null; // No user found
  }

  const storedPasswordHash = res.rows[0].password_hash;

  // Compare the provided password with the stored hash
  const passwordMatches = providedPassword === storedPasswordHash.toString('utf-8');
  console.log(passwordMatches);
  console.log(providedPassword);
  console.log(storedPasswordHash.toString('utf-8'));
  console.log(res.rows[0].id);

  if (passwordMatches) {
    return res.rows[0].id; // Return the account ID
  } else {
    return null; // Password does not match
  }
}

export type EditCustomerOpts = Partial<Omit<Customer, "accountId" | "email" | "state">>;
export async function editCustomer(accountId: number, opts: EditCustomerOpts) {
  const queryText = `
  UPDATE customer SET
    first_name = COALESCE($2, first_name),
    last_name = COALESCE($3, last_name),
    wants_promotions = COALESCE($4, wants_promotions)
  WHERE account_id = $1;
  `;

  const values = [accountId, opts.firstName, opts.lastName, opts.wantsPromotions];
  await query(queryText, values);
}

export type CreateAdminOpts = Omit<Admin & {password: string}, "accountId">;
export async function createAdmin(opts: CreateAdminOpts) {
  const queryText = `
  WITH new_id AS (
    INSERT INTO account (password_hash)
    VALUES ($2)
    RETURNING id
  )
  INSERT INTO admin (account_id, employee_id, title)
  VALUES ((SELECT id FROM new_id), $1, $3)
  RETURNING account_id;
  `;


  // TODO: Hash!
  const passwordHash = opts.password;

  const values = [opts.employeeId, passwordHash, opts.title];
  const res = await query(queryText, values);

  return res.rows[0].account_id as number;
}

export async function compareAdminLogin(employeeId: string, providedPassword: string) {
  const queryText = `
  SELECT password_hash
  FROM account as a
  JOIN admin as e
  ON a.id = e.account_id
  WHERE e.employee_id = $1;
  `;

  const values = [employeeId];
  const res = await query(queryText, values);
  const storedPasswordHash = res.rows[0].password_hash;

  // TODO: Hash!
  const providedPasswordHash = providedPassword;

  // TODO: Compare hashes
  return storedPasswordHash === providedPasswordHash;
}

export async function resetAccountPassword(accountId: string, newPassword: string) {
  const queryText = `
  UPDATE account SET
    password_hash = $2
  WHERE id = $1;
  `;

  // TODO: Hash!
  const passwordHash = newPassword;

  const values = [accountId, passwordHash];
  await query(queryText, values);
}

export async function getIsAdmin(accountId: number) {
  const queryText = `
  SELECT employee_id IS NOT NULL as is_admin
  FROM account as a
  LEFT JOIN admin as e
  ON a.id = e.account_id
  WHERE a.id = $1;
  `;

  const values = [accountId];
  const res = await query(queryText, values);

  return res.rows[0].is_admin as boolean;
};
