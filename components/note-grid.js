import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@reach/tabs'
import Link from 'next/link'
import {IconEnvelope, Note} from './index'

export const NoteGrid = ({inbox, outbox, viewerId}) => (
  <Tabs>
    <TabList>
      <Tab>Received</Tab>
      <Tab>Sent</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        {inbox?.length ? (
          <ul className="note-grid">
            {inbox.map(({id, viewedBy}) => (
              <li className="note-grid__cell" key={id}>
                <Link href={`/notes?note=${id}`} as={`/note/${id}`}>
                  <a className="link -no-ul">
                    <IconEnvelope open={viewedBy?.includes(viewerId)} />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="info wrapper">
            <p className="info__text">
              Looks like no notes match your interests.
            </p>
            <p className="info__text">
              <Link href="/profile">
                <a>Click here</a>
              </Link>{' '}
              to add some.
            </p>
          </div>
        )}
      </TabPanel>
      <TabPanel>
        {outbox?.length ? (
          <ul className="note-grid">
            {outbox.map(({id, content, color, style, font}) => (
              <li className="note-grid__cell" key={id}>
                <Link href={`/notes?note=${id}`} as={`/note/${id}`}>
                  <a className="link -no-ul">
                    <Note color={color} style={style} font={font}>
                      {content}
                    </Note>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="info wrapper">
            <p className="info__text">Your sent notes will show up here. </p>
            <p className="info__text">
              <Link href="/new">
                <a>Click here</a>
              </Link>{' '}
              to send you first!
            </p>
          </div>
        )}
      </TabPanel>
    </TabPanels>
  </Tabs>
)
