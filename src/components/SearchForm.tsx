
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

type SearchFormProps = {
  onSearch: (searchTerm: string) => void;
};

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex w-full items-center space-x-2 animate-fade-in">
        <Input
          type="text"
          placeholder="Search for activities (e.g., bike, recycle)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="eco-input"
        />
        <Button type="submit" className="bg-eco-forest hover:bg-eco-moss">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
