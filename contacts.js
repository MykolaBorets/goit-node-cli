import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const saveContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const data = await listContacts();

  const result = data.find((item) => item.id === contactId);
  return result || null;
};

export const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const deletedContact = data.slice(index, index + 1)[0];
  data.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return deletedContact;
};

export const addContact = async (name, email, phone) => {
  const data = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  data.push(newContact);
  await saveContacts(data);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return newContact;
};
