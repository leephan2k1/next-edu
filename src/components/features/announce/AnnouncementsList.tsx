import React from 'react';
import AnnouncementItem from './AnnouncementItem';

export default function AnnouncementsList() {
  return (
    <ul className="mx-auto space-y-6 lg:w-3/4">
      <AnnouncementItem />
      <AnnouncementItem />
    </ul>
  );
}
