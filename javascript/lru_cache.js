class Node {
  constructor(data = null, key = null, next = null, prev = null) {
    this.data = data;
    this.key = key;
    this.next = next;
    this.prev = prev;
  }
}

class DoublyLinkedList {
  constructor(head = null, tail = null) {
    this.head = head;
    this.tail = tail;
  }

  // ADD THE NODE TO THE HEAD OF THE LIST
  addHead(node) {
    if (!this.head) {
      this.head = node;
      this.tail = node;
      node.next = null;
      node.prev = null;
    }
    
    node.prev = null;
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  // REMOVE THE TAIL NODE FROM THE LIST
  // AND RETURN IT
  removeTail() {
    if (!this.tail)
      return null;

    const oldTail = this.tail;
    this.tail = this.tail.prev;
    if (this.tail)
      this.tail.next = null;
    else 
      this.head = null;
    oldTail.prev = null;

    return oldTail;
  }

  // REMOVE THE GIVEN NODE FROM THE LIST
  // AND THEN RETURN IT
  removeNode(node) {
    if (node === this.head && node === this.tail) {
      this.head = null;
      this.tail = null;
    } else if (node === this.head) {
      this.head = node.next;
      node.next.prev = node.prev;
    } else if (node === this.tail) {
      this.tail = node.prev;
      node.prev.next = node.next;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
    node.prev = null;
    node.next = null;

    return node;
  }

  // MOVE THE GIVEN NODE FROM ITS LOCATION TO THE HEAD
  // OF THE LIST
  moveNodeToHead(node) {
    this.removeNode(node);
    this.addHead(node);
  }
}

class LRUCache {
  constructor(limit = 10) {
    this.limit = limit;
    this.size = 0;
    this.hash = {};
    this.list = new DoublyLinkedList();
  }

  // RETRIEVE THE NODE FROM THE CACHE USING THE KEY
  // IF THE NODE IS IN THE CACHE, MOVE IT TO THE HEAD OF THE LIST AND RETURN IT
  // OTHERWISE RETURN -1
  get(key) {
    // retrieve the node from the hash map.
    const node = this.hash[key];

    // if node isn't in the LRU cache, return -1
    if (!node)
      return -1;

    // otherwise, move the node to the front and return the node.
    this.list.moveNodeToHead(node);
    return node;
  }

  // ADD THE GIVEN KEY AND VALUE TO THE CACHE
  // IF THE CACHE ALREADY CONTAINS THE KEY, UPDATE ITS VALUE AND MOVE IT TO 
  // THE HEAD OF THE LIST
  // IF THE CACHE DOESN'T CONTAIN THE KEY, ADD IT TO THE CACHE AND PLACE IT
  // AT THE HEAD OF THE LIST
  // IF THE CACHE IS FULL, REMOVE THE LEAST RECENTLY USED ITEM BEFORE ADDING
  // THE NEW DATA TO THE CACHE
  put(key, value) {
    // Retrieve the node from the hasp map
    const node = this.hash[key];

    if (node) {
      // otherwise,
      // - update the node
      // - move the node to the front.
      node.data = value;
      this.list.moveNodeToHead(node);
    } else {
      // if key isn't in the hash map, 
      //  - create a node and add to the hash map.
      //  if size === limit, remove tail and decrease its size
      //  - add the node to the front, 
      //  - increase size.
      if (this.size === this.limit) {
        const oldTail = this.list.removeTail();
        delete this.hash[oldTail.key];
        this.size--;
      }
      const newNode = new Node(value, key);
      this.hash[key] = newNode;
      this.list.addHead(newNode);
      this.size++;
    }
  }
}

if (require.main === module) {
  // add your own tests in here
  // const dll = new DoublyLinkedList();
  // dll.addHead(new Node(10, 1));
  // console.log("");
  // console.log("Add a node with 10");
  // console.log(dll);

  // dll.addHead(new Node(20, 2));
  // console.log("");
  // console.log("Add a node with 20");
  // console.log(dll);

  // dll.addHead(new Node(30, 3));
  // console.log("");
  // console.log("Add a node with 30");
  // console.log(dll);

  // console.log("");
  // console.log("dll.removeTail()");
  // console.log(dll.removeTail());
  // console.log(dll);

  // console.log("");
  // console.log("dll.removeTail()");
  // console.log(dll.removeTail());
  // console.log(dll);

  // console.log("");
  // console.log("dll.removeTail()");
  // console.log(dll.removeTail());
  // console.log(dll);

  // dll.addHead(new Node(10, 1));
  // dll.addHead(new Node(20, 2));
  // dll.addHead(new Node(30, 3));
  // console.log("");
  // console.log(dll);

  // console.log("");
  // console.log("dll.removeNode(dll.head.next)");
  // console.log(dll.removeNode(dll.head.next));
  // console.log(dll);

  // console.log("");
  // console.log("dll.removeNode(dll.head.next)");
  // console.log(dll.removeNode(dll.head.next));
  // console.log(dll);

  // console.log("");
  // console.log("dll.removeNode(dll.head)");
  // console.log(dll.removeNode(dll.head));
  // console.log(dll);

  // dll.addHead(new Node(10, 1));
  // dll.addHead(new Node(20, 2));
  // dll.addHead(new Node(30, 3));
  // console.log("");
  // console.log(dll);

  // console.log("");
  // console.log("dll.moveNodeToHead(this.tail)");
  // dll.moveNodeToHead(dll.tail);
  // console.log(dll);

  // console.log("");
  // console.log("dll.moveNodeToHead(this.head.next)");
  // dll.moveNodeToHead(dll.head.next);
  // console.log(dll);

  // console.log("");
  // console.log("dll.moveNodeToHead(this.head)");
  // dll.moveNodeToHead(dll.head);
  // console.log(dll);

  const lru = new LRUCache(3);
  console.log("");
  console.log('lru: ', lru);

  lru.put("1", "10");
  lru.put("2", "20");
  lru.put("3", "30");
  console.log("");
  console.log('lru: ', lru);

  lru.put('3', '300');
  console.log("");
  console.log("lru.put('3', '300')");
  console.log('lru: ', lru);

  lru.put('2', '200');
  console.log("");
  console.log("lru.put('2', '200')");
  console.log('lru: ', lru);

  lru.put('1', '100');
  console.log("");
  console.log("lru.put('1', '100')");
  console.log('lru: ', lru);

  lru.put('4', '40');
  console.log("");
  console.log("lru.put('4', '40')");
  console.log('lru: ', lru);

  console.log("");
  console.log("lru.get('5')");
  console.log(lru.get('5'));

  console.log("");
  console.log("lru.get('1')");
  console.log(lru.get('1'));

  console.log("");
  console.log("lru.get('2')");
  console.log(lru.get('2'));
}

module.exports = {
  Node,
  DoublyLinkedList,
  LRUCache
};

// Please add your pseudocode to this file
// And a written explanation of your solution
