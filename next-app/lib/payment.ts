import { query } from "./database";

export interface PaymentMethod {
  id: number;
  cardOwnerId: number;
  cardNumberLastFour: string;
  billingAddress: string;
  expirationDate: Date;
};

type AddPaymentMethodOpts = Omit<PaymentMethod & {cardNumber: string}, "cardNumberLastFour" | "cardOwnerId">;
export async function addPaymentMethod(accountId: number, opts: AddPaymentMethodOpts) {
  const queryText = `
  INSERT INTO payment_method (
    card_owner_id,
    card_number,
    card_number_last_four,
    billing_address,
    expiration_date
  ) VALUES ($1, $2, $3, $4, $5)
  RETURNING id;
  `

  const cardNumberLastFour = opts.cardNumber.substring(opts.cardNumber.substring.length - 4);
  if (cardNumberLastFour.length != 4) {
    throw new Error("Card number is too short.");
  }

  // TODO: Encrypt!
  const cardNumberCipher = opts.cardNumber;

  const values = [accountId, cardNumberCipher, cardNumberLastFour, opts.billingAddress, opts.expirationDate];
  const res = await query(queryText, values);

  return res.rows[0].id as number;
}

export async function getPaymentMethodCount(accountId: number) {
  const queryText = `
  SELECT count(1) as amount
  FROM payment_method
  WHERE card_owner_id = $1;
  `;

  const values = [accountId];
  const res = await query(queryText, values);

  return res.rows[0].amount as number;
}

export async function getAllPaymentMethods(accountId: number) {
  const queryText = `
  SELECT id, card_owner_id, card_number_last_four, expiration_date, billing_address
  FROM payment_method
  WHERE card_owner_id = $1;
  `;

  const values = [accountId];
  const res = await query(queryText, values);

  const out: PaymentMethod[] = [];
  for (const row of res.rows) {
    out.push({
      id: row.id,
      cardOwnerId: row.card_owner_id,
      cardNumberLastFour: row.card_number_last_four,
      expirationDate: row.expiration_date,
      billingAddress: row.billing_address,
    });
  }

  return out;
}

export async function getPaymentMethod(cardId: number) {
  const queryText = `
  SELECT
    id, card_owner_id, card_number_last_four, expiration_name, billing_address
  FROM payment_method
  WHERE id = $1;
  `;

  const values = [cardId];
  const res = await query(queryText, values);

  return {
    id: res.rows[0].id,
    cardOwnerId: res.rows[0].card_owner_id,
    cardNumberLastFour: res.rows[0].card_number_last_four,
    expirationDate: res.rows[0].expiration_date,
    billingAddress: res.rows[0].billing_address,
  };
}

export type EditPaymentMethodOpts = Partial<Pick<PaymentMethod, "billingAddress" | "expirationDate">>;
export async function editPaymentMethod(cardId: number, opts: EditPaymentMethodOpts) {
  const queryText = `
    UPDATE payment_method SET
      billing_address = COALESCE($2, billing_address),
      expiration_date = COALESCE($3, expiration_date)
    WHERE id = $1;
  `;

  const values = [cardId, opts.billingAddress, opts.expirationDate];
  await query(queryText, values);
}

export async function removePaymentMethod(cardId: number) {
  const queryText = `
  DELETE FROM payment_method
  WHERE id = $1;
  `;

  const values = [cardId];
  await query(queryText, values);
}
