import React from 'react';
import { IAboutPage } from '../../../interfaces/IAboutPage';
import AboutForm from './aboutform';
import { getPageData } from '../../../lib/data';

export default async function Component() {
  return (
    <div className="container mx-auto py-4 md:px-4 md:px-6 lg:px-8">
      <AboutForm />
    </div>
  );
}
