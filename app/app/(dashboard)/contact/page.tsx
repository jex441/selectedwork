import React from 'react';
import { IContactPage } from '../../interfaces/IContactPage';
import ContactForm from './contactform';
import { getContactPageData } from '../../../lib/data';

export default async function Component() {
  const data: IContactPage | undefined = await getContactPageData('Contact');
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      {data && <ContactForm data={data} />}
    </div>
  );
}
