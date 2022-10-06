const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

// TODO: задокументувати кожну функцію

async function updateContacts(contacts) {
  return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(({ id }) => id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();

  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };

  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  contactsPath,
};
