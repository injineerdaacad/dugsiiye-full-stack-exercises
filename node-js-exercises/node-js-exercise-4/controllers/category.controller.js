const categories = [
  { type: "income", name: "Work" },
  { type: "income", name: "Freelance" },
  { type: "income", name: "Business" },
  { type: "income", name: "Investments" },
  { type: "income", name: "Other Income" },
  { type: "expense", name: "Food" },
  { type: "expense", name: "Transport" },
  { type: "expense", name: "Rent" },
  { type: "expense", name: "Utilities" },
  { type: "expense", name: "Shopping" },
  { type: "expense", name: "Health" },
  { type: "expense", name: "Education" },
  { type: "expense", name: "Entertainment" },
  { type: "expense", name: "Other Expense" },
];

export const getCategories = async (req, res) => {
  res.status(200).json({
    success: true,
    count: categories.length,
    categories,
  });
};
