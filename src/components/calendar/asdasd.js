db.Appointments.findAndUpdate(
  { service: ObjectId('606361ef2ddeb70017ca167e') },
  { $set: { service: '61802138b6d7c4001866e25a' } }
)
