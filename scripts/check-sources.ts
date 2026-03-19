import { sourceCards } from '../src/lib/catalog';
import { getStaleness } from '../src/lib/site';

const staleSources = sourceCards.filter((item) => getStaleness(item).stale);

console.log(`checked ${sourceCards.length} sources`);

if (staleSources.length > 0) {
  console.error(
    `stale sources detected:\n${staleSources
      .map((item) => `- ${item.id} (${item.title}) reviewed ${item.lastReviewed}`)
      .join('\n')}`,
  );
  process.exit(1);
}

console.log('source freshness check passed');
