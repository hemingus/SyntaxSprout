import { TreeNode } from '../components/TreeNode'

var and4 = new TreeNode("we_are_the_words_we_are_the_children")
var and3 = new TreeNode("we_are_the_words_we_are_the_children", [and4])
var and2 = new TreeNode("we_are_the_words_we_are_the_children", [and3])
var and1 = new TreeNode("we_are_the_words_we_are_the_children", [and2])

var c1_gc1 = new TreeNode("we_are_the_words_we_are_the_children")
var c1_gc2 = new TreeNode("we_are_the_words_we_are_the_children")
var c1_gc3 = new TreeNode("we_are_the_words_we_are_the_children")
    
var c2_gc1 = new TreeNode("we_are_the_words_we_are_the_children")  
var c2_gc2 = new TreeNode("we_are_the_words_we_are_the_children", [and1])
var c2_gc3 = new TreeNode("we_are_the_words_we_are_the_children")

var c3_gc1 = new TreeNode("we_are_the_words_we_are_the_children")
var c3_gc2 = new TreeNode("we_are_the_words_we_are_the_children")
var c3_gc3 = new TreeNode("we_are_the_words_we_are_the_children")

var child1 = new TreeNode("the_eldest_son_child1", [c1_gc1])
var child2 = new TreeNode("the_middle_son_child2", [c2_gc1, c2_gc2, c2_gc3])
var child3 = new TreeNode("the_youngest_son_child3", [c3_gc1, c3_gc2, c3_gc3])
    
export const bigTree = new TreeNode("S", [child1, c1_gc2, c1_gc3, child2, child3])

var word1 = new TreeNode("YouTube")
var word2 = new TreeNode("shows")
var word3 = new TreeNode("that")
var word4 = new TreeNode("the")
var word5 = new TreeNode("cat")
var word6 = new TreeNode("plays")
var word7 = new TreeNode("piano")

var N1 = new TreeNode("N", [word1])
var V1 = new TreeNode("V", [word2])
var Comp1 = new TreeNode("Comp", [word3])
var Det1 = new TreeNode("Det", [word4])
var N2 = new TreeNode("N", [word5])
var V2 = new TreeNode("V", [word6])
var N3 = new TreeNode("N", [word7])

var NP1 = new TreeNode("NP", [N1])
var NP2 = new TreeNode("NP", [Det1, N2])
var NP3 = new TreeNode("NP", [N3])
var VP1 = new TreeNode("V", [V2, NP3])
var S1 = new TreeNode("S", [NP2, VP1])
var S_1 = new TreeNode("S'", [Comp1, S1])
var VP2 = new TreeNode("VP", [V1, S_1])

export const expectedTree = new TreeNode("S", [NP1, VP2], undefined)