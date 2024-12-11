import { query } from "./database";

export interface Promotion {
  code: string;
  percentOff: number;
  endTime: Date;
  editable: boolean;
}

export type CreatePromotionOpts = Omit<Promotion, "editable">;
export async function createPromotion(opts: CreatePromotionOpts) {
  const queryText = `
  INSERT INTO promotion (code, percent_off, end_time)
  VALUES ($1, $2, $3)
  RETURNING code;
  `;

  const values = [opts.code, opts.percentOff, opts.endTime];
  const res = await query(queryText, values);

  return res.rows[0].code as string;
}

export async function getPromotion(code: string): Promise<Promotion | null> {
  const queryText = `
    SELECT
      code, percent_off, start_time, editable
    FROM promotion
    WHERE code = $1;
  `;

  const values = [code];
  const res = await query(queryText, values);

  if (res.rowCount === 0) return null;
  return {
    code: res.rows[0].code,
    percentOff: res.rows[0].percent_off,
    endTime: res.rows[0].end_time,
    editable: res.rows[0].editable,
  }
}

export async function getAllPromotions() {
  const queryText = `
  SELECT * FROM promotion
  `;

  const res = await query(queryText);
  console.log('Databse response:', res);
  console.log('row Count:', res.rowCount);  

  if(res.rowCount == 0) {
      return null; // no movies found
  }

  const data = {
    rowCount: res.rowCount,
    promotions : res.rows.map((row) => Object.values(row)),
  };
  console.log(data.promotions);

  return data;
}

// Returns all emails for users opted into promotions
export async function getEmailsForPromotions() {
  const queryText = `
  SELECT email FROM customer WHERE wants_promotions = TRUE;
  `;

  const res = await query(queryText);

  const out: string[] = [];
  for (const row of res.rows) {
    out.push(row.email as string);
  };

  return out
}

// Should set promotion to not editable when it is sent out.
export async function setPromotionEditable(code: string, editable: boolean) {
  const queryText = `
  UPDATE promotion SET
    editable = $2
  WHERE code = $1;
  `;

  const values = [code, editable];
  await query(queryText, values);
}

export type EditPromotionOpts = Partial<Omit<Promotion, "editable" | "code">>;
export async function editPromotion(code: string, opts: EditPromotionOpts) {
  const queryText = `
  UPDATE promotion SET
    percent_off = COALESCE($2, percent_off),
    start_time = COALESCE($3, start_time)
  WHERE code = $1;
  `;

  const values = [code, opts.percentOff, opts.endTime];
  await query(queryText, values);
};
