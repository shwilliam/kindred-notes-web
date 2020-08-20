import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@reach/tabs'
import Link from 'next/link'
import {getEmojiFromCountryCode, truncate} from '../lib'
import {IconEnvelope, Note} from './index'

export const InboxOutboxTabs = ({inbox, outbox, viewerId}) => (
  <Tabs>
    <TabList>
      <Tab>Received</Tab>
      <Tab>Sent</Tab>
    </TabList>
    <TabPanels className="wrapper -large -no-pad">
      <TabPanel>
        {inbox?.length ? (
          <ul className="note-grid">
            {inbox.map(({id, viewers, author}) => {
              const isOpen = !!viewers?.some(({id}) => id === viewerId)
              const flag = getEmojiFromCountryCode(author.country) || ''

              return (
                <li className="note-grid__cell -fill" key={id}>
                  <Link
                    href={`/notes?note=${id}${isOpen ? '' : '&new=1'}`}
                    as={`/note/${id}`}
                  >
                    <a className="link -no-ul">
                      <div className="note-grid__cell-icon">
                        <IconEnvelope open={isOpen} stamp={flag} />
                      </div>
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="wrapper">
            <div className="info">
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
          </div>
        )}
      </TabPanel>
      <TabPanel>
        {outbox?.length ? (
          <ul className="note-grid">
            {outbox.map(({id, content, color, style, font}) => (
              <li className="note-grid__cell -grid" key={id}>
                <Link href={`/notes?note=${id}`} as={`/note/${id}`}>
                  <a className="link -no-ul">
                    <Note color={color} style={style} font={font}>
                      {truncate(50, content)}
                    </Note>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="wrapper">
            <div className="info">
              <p className="info__text">Your sent notes will show up here. </p>
              <p className="info__text">
                <Link href="/new">
                  <a>Click here</a>
                </Link>{' '}
                to send you first!
              </p>
            </div>
          </div>
        )}
      </TabPanel>
    </TabPanels>
  </Tabs>
)
