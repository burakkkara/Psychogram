import React from 'react';
import MeetingCard from './MeetingCard';
import * as ROLES from '../../_constants/roles';

const MeetingList = props => {
    const { chatPairs, meetings, authUser, onClick } = props;

    const listMeetings = () => {
        if (chatPairs && meetings) {
            let cards = [];
            for (let [key, value] of chatPairs) {
                const meeting = meetings.find(item =>
                    authUser.role === ROLES.PATIENT
                        ? item.doctorId === key
                        : item.userId === key
                );
                cards.push(
                    <div
                        key={meeting.key}
                        onClick={() =>
                            onClick(meeting.key, value, meeting.reservations)
                        }
                    >
                        <MeetingCard
                            user={value}
                            message={meeting.lastMessage}
                        />
                    </div>
                );
            }
            return cards;
        } else {
            // TODO styling
            return <div className="text-center">Konuşma Bulunamadı</div>;
        }
    };

    return (
        <div className="row list-row">
            <div className="col-12 padding-0">{listMeetings()}</div>
        </div>
    );
};

export default MeetingList;
