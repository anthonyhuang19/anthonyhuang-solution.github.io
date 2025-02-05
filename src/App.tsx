import React, { useState, useEffect } from 'react';
import { Search, Code2 } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-python';

interface Solution {
  name: string;
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const MOCK_SOLUTIONS: Solution[] = [
  {
    name: '1.add two numbers.py',
    content: `def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
    dummy = ListNode(0)
    curr = dummy
    carry = 0
    
    while l1 or l2 or carry:
        x = l1.val if l1 else 0
        y = l2.val if l2 else 0
        
        total = x + y + carry
        carry = total // 10
        
        curr.next = ListNode(total % 10)
        curr = curr.next
        
        if l1: l1 = l1.next
        if l2: l2 = l2.next
            
    return dummy.next`,
    difficulty: 'medium'
  },
  {
    name: 'median_sorted_arrays.py',
    content: `def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    
    x, y = len(nums1), len(nums2)
    low, high = 0, x

    while low <= high:
        partitionX = (low + high) // 2
        partitionY = (x + y + 1) // 2 - partitionX
        
        maxLeftX = float('-inf') if partitionX == 0 else nums1[partitionX - 1]
        minRightX = float('inf') if partitionX == x else nums1[partitionX]
        
        maxLeftY = float('-inf') if partitionY == 0 else nums2[partitionY - 1]
        minRightY = float('inf') if partitionY == y else nums2[partitionY]
        
        if maxLeftX <= minRightY and maxLeftY <= minRightX:
            if (x + y) % 2 == 0:
                return (max(maxLeftX, maxLeftY) + min(minRightX, minRightY)) / 2
            else:
                return max(maxLeftX, maxLeftY)
                
        elif maxLeftX > minRightY:
            high = partitionX - 1
        else:
            low = partitionX + 1`,
    difficulty: 'hard'
  }
];

function App() {
  const [solutions, setSolutions] = useState<Solution[]>(MOCK_SOLUTIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);

  const stats = {
    easy: solutions.filter(s => s.difficulty === 'easy').length,
    medium: solutions.filter(s => s.difficulty === 'medium').length,
    hard: solutions.filter(s => s.difficulty === 'hard').length
  };

  useEffect(() => {
    if (selectedSolution) {
      Prism.highlightAll();
    }
  }, [selectedSolution]);

  const filteredSolutions = solutions.filter(solution =>
    solution.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4]">
      <div className="grid grid-cols-[300px_1fr] h-screen">
        {/* Sidebar */}
        <div className="bg-[#252526] border-r border-[#404040] p-4 flex flex-col">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-6 p-4 bg-[#1e1e1e] rounded-lg">
            <div className="text-center p-2 rounded">
              <div className="text-[#00af9b] font-semibold">{stats.easy}</div>
              <div className="text-sm">Easy</div>
            </div>
            <div className="text-center p-2 rounded">
              <div className="text-[#ffa116] font-semibold">{stats.medium}</div>
              <div className="text-sm">Medium</div>
            </div>
            <div className="text-center p-2 rounded">
              <div className="text-[#ff375f] font-semibold">{stats.hard}</div>
              <div className="text-sm">Hard</div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 bg-[#1e1e1e] border border-[#404040] rounded-md text-[#d4d4d4] focus:outline-none focus:border-[#0078d4]"
              placeholder="Search solutions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Solutions List */}
          <div className="overflow-y-auto flex-grow">
            {filteredSolutions.map((solution) => (
              <div
                key={solution.name}
                className={`p-2 cursor-pointer rounded-md mb-1 flex items-center justify-between hover:bg-white/10 transition-colors ${
                  selectedSolution?.name === solution.name ? 'bg-[#0078d4]' : ''
                }`}
                onClick={() => setSelectedSolution(solution)}
              >
                <span className="flex items-center gap-2">
                  <Code2 size={16} />
                  {solution.name}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${solution.difficulty === 'easy' ? 'bg-[#00af9b]' : ''}
                  ${solution.difficulty === 'medium' ? 'bg-[#ffa116]' : ''}
                  ${solution.difficulty === 'hard' ? 'bg-[#ff375f]' : ''}`}
                >
                  {solution.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 overflow-y-auto">
          {selectedSolution ? (
            <div className="bg-[#252526] rounded-lg overflow-hidden">
              <div className="bg-[#1e1e1e] px-4 py-2 border-b border-[#404040] flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <Code2 size={16} />
                  {selectedSolution.name}
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${selectedSolution.difficulty === 'easy' ? 'bg-[#00af9b]' : ''}
                    ${selectedSolution.difficulty === 'medium' ? 'bg-[#ffa116]' : ''}
                    ${selectedSolution.difficulty === 'hard' ? 'bg-[#ff375f]' : ''}`}
                  >
                    {selectedSolution.difficulty}
                  </span>
                </span>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="language-python">{selectedSolution.content}</code>
              </pre>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a solution from the sidebar to view the code
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
