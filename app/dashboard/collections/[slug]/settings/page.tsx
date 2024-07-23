import SettingsForm from './settingsform';
import { getUserCollection } from '../../../../lib/data';
import { ICollection } from '../../../../interfaces/ICollection';

export default async function Component({
  params,
}: {
  params: { slug: string };
}) {
  const collection = await getUserCollection(params.slug);

  return collection && <SettingsForm collection={collection} />;
}
