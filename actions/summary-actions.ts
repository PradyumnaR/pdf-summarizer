'use server';

import { getDBConnection } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function deleteSummaryAction({
  summaryId,
}: {
  summaryId: string;
}) {
  try {
    const sql = await getDBConnection();
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      throw new Error('User not found');
    }
    const result =
      await sql`DELETE from pdf_summaries where id=${summaryId} AND user_id=${userId} RETURNING id;`;

    if (result.length > 0) {
      revalidatePath('/dashboard');
      return { success: true };
    }

    return { success: false };
  } catch (err) {
    console.error('Error deleting summary', err);
    throw err;
  }
}
