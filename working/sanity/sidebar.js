import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import { MdHome } from 'react-icons/md';

// build a custom sidebar

export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // create a new sub item
      S.listItem()
        .title('Home Page')
        .icon(() => <MdHome />)
        .child(S.editor().schemaType('storeSettings').documentId('downtown')),
      // add rest of items
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ), // filter removes the duplicate
    ]);
}
