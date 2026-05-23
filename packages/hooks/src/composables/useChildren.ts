/*
 * @Description: use-children
 */

import type { ComponentInternalInstance, VNode, VNodeNormalizedChildren } from 'vue'
import { isVNode, shallowRef } from 'vue'

const appendFlattedChildren = (children: VNodeNormalizedChildren, result: VNode[]) => {
  const vNodes = Array.isArray(children) ? children : [children]

  vNodes.forEach((child) => {
    if (Array.isArray(child)) {
      appendFlattedChildren(child, result)
    } else if (isVNode(child) && Array.isArray(child.children)) {
      appendFlattedChildren(child.children, result)
    } else {
      result.push(child as VNode)
      if (isVNode(child) && child.component?.subTree) {
        appendFlattedChildren(child.component.subTree as unknown as VNode[], result)
      }
    }
  })
}

const flattedChildren = (children: VNodeNormalizedChildren) => {
  const result: VNode[] = []
  appendFlattedChildren(children, result)
  return result
}

const getOrderedChildren = <T>(
  vm: ComponentInternalInstance,
  childComponentName: string,
  children: Record<number, T>,
): T[] => {
  const nodes = flattedChildren(vm.subTree.children).filter(
    (n): n is VNode => isVNode(n) && (n.type as any)?.name === childComponentName && !!n.component,
  )
  const uids = nodes.map(n => n.component!.uid)
  return uids.map(uid => children[uid]).filter((p): p is T => !!p)
}

export const useChildren = <T extends { uid: number }>(vm: ComponentInternalInstance, childComponentName: string) => {
  const children: Record<number, T> = {}
  const orderedChildren = shallowRef<T[]>([])

  const addChild = (child: T) => {
    children[child.uid] = child
    orderedChildren.value = getOrderedChildren(vm, childComponentName, children)
  }
  const removeChild = (uid: number) => {
    delete children[uid]
    orderedChildren.value = orderedChildren.value.filter(children => children.uid !== uid)
  }

  return {
    children: orderedChildren,
    addChild,
    removeChild,
  }
}
