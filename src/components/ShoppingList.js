import React, { useEffect,useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => {
        setItems(items); // Set fetched items to state
      });
  }, []);

  function handleAddItem(newItem) {
    // Assign unique id based on current max id + 1
    const newItemWithId = { ...newItem, id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1 };
    setItems([...items, newItemWithId]);
  }

  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
  }

  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }


  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm  onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id}
                item={item}
                onUpdateItem={handleUpdateItem}
                onDeleteItem={handleDeleteItem} 
                />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
