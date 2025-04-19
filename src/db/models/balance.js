import mongoose from 'mongoose';

const balanceSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Balance = mongoose.model('Balance', balanceSchema);

export default Balance;
