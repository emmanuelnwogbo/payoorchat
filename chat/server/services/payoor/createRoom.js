import Room from '../../models/room';

async function createRoom(roomId) {
    let room = await Room.findOne({ roomId });

    if (!room) {
        room = new Room({
            roomId
        });

        await room.save();

        return room;
    }

    return room;
}

export default createRoom;