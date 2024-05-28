function SearchbarChat({ setSearchTerm, searchTerm }) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      className="w-full mt-2 p-1 rounded-medium border border-solid border-primaryDark bg-transparent text-center focus:outline-1 focus:outline-solid focus:border-hover transition-colors duration-300"
      placeholder="Search by name, email, etc."
      onChange={handleSearchChange}
    />
  );
}

export default SearchbarChat;
