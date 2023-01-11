import { PencilIcon } from '@heroicons/react/24/solid';
import { memo, useState } from 'react';
import { Else, If, Then } from 'react-if';
import RemoveButton from '~/components/buttons/RemoveButton';
import ClientOnly from '~/components/shared/ClientOnly';
import Editor from '~/components/shared/Editor';

const ex = `<p>todo</p><ul><li><p>test</p></li><li><p>dev</p></li><li><p>test</p></li><li><p>dev</p></li></ul>`;

function NoteItem() {
  const [editable, setEditable] = useState(false);

  return (
    <li className="flex min-h-[300px] flex-col space-y-4 rounded-xl bg-light-background px-3 py-2 dark:bg-black">
      <div className="flex items-center space-x-2">
        <span className="h-fit w-fit rounded-xl bg-white px-3 py-2 text-lg text-gray-600">
          00:30
        </span>
        <h2 className="text-lg font-bold line-clamp-2 dark:text-primary md:text-xl">
          1. Lorem ipsum dolor sit
        </h2>
      </div>

      <h3 className="text-lg">
        2. Lorem ipsum dolor sit amet consectetur adipisicin
      </h3>

      <If condition={editable}>
        <Then>
          <ClientOnly>
            <Editor
              contents={ex}
              handleCancel={() => {
                setEditable(false);
              }}
            />
          </ClientOnly>
        </Then>

        <Else>
          <article
            className={`prose-lg prose min-h-fit min-w-full overflow-x-hidden rounded-xl border  border-dashed border-gray-500 px-3 py-2 text-gray-600 prose-img:rounded-2xl dark:text-white/80 lg:prose-xl`}
            dangerouslySetInnerHTML={{ __html: ex }}
          ></article>

          <div className="flex w-full justify-end space-x-4">
            <button
              onClick={() => setEditable(true)}
              className="smooth-effect rounded-xl p-4 hover:bg-white dark:hover:bg-dark-background"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <RemoveButton />
          </div>
        </Else>
      </If>
    </li>
  );
}

export default memo(NoteItem);
