import { openDB } from 'idb';





export async function add(chartData) {

  const db = await openDB('chartDB', 1, db => {
    db.createObjectStore('charts', { keyPath: 'id' });
  })

  console.log('db', db)
  const transaction = db.transaction(['charts'], 'readwrite');
  const charts = transaction.objectStore('charts');
  console.log(charts, chartData)
  await db.add(chartData);
  await transaction.complete;
}



