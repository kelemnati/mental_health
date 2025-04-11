const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    evenType: { type: String, enum: ["free", "paid"], required: true },
    seatsAvailable: Number,
    date: Date,
    location: String,
    isVirtual: Boolean,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    categories: {
      type: [String],
      enum: [
        "trauma",
        "depression",
        "anxiety",
        "stress",
        "bipolar disorder",
        "schizophrenia",
        "addiction",
        "eating disorder",
        "self-esteem",
        "grief",
        "post-traumatic stress disorder",
        "anger management",
        "panic attacks",
        "relationship issues",
        "mindfulness",
        "meditation",
        "therapy",
        "suicide prevention",
        "sleep disorders",
        "anger management",
        "mental health awareness",
        "personal growth",
        "self-harm",
        "social anxiety",
        "body image",
        "stress management",
        "psychotherapy",
        "counseling",
        "parenting support",
        "emotional regulation",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
