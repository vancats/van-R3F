import * as THREE from 'three'

// 在 R3F 以外创建的颜色，不是由通常的颜色管理器来处理的，需要额外设置
THREE.ColorManagement.legacyMode = false
export const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

export const floor1Material = new THREE.MeshStandardMaterial({ color: '#111111', metalness: 0, roughness: 0 })

export const floor2Material = new THREE.MeshStandardMaterial({ color: '#222222', metalness: 0, roughness: 0 })

export const obstacleMaterial = new THREE.MeshStandardMaterial({ color: '#FF0000', metalness: 0, roughness: 1 })
export const wallMaterial = new THREE.MeshStandardMaterial({ color: '#887777', metalness: 0, roughness: 0 })
