import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CollectionApproChanged,
  OfferClosed,
  OfferCreated,
  OwnershipTransferred,
  PiecePurchased
} from "../generated/NFTFootballMarketPlace/NFTFootballMarketPlace"

export function createCollectionApproChangedEvent(
  collection: Address,
  approved: boolean
): CollectionApproChanged {
  let collectionApproChangedEvent = changetype<CollectionApproChanged>(
    newMockEvent()
  )

  collectionApproChangedEvent.parameters = new Array()

  collectionApproChangedEvent.parameters.push(
    new ethereum.EventParam(
      "collection",
      ethereum.Value.fromAddress(collection)
    )
  )
  collectionApproChangedEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return collectionApproChangedEvent
}

export function createOfferClosedEvent(
  collectionId: Address,
  seller: Address,
  pieceID: BigInt,
  offerID: BigInt
): OfferClosed {
  let offerClosedEvent = changetype<OfferClosed>(newMockEvent())

  offerClosedEvent.parameters = new Array()

  offerClosedEvent.parameters.push(
    new ethereum.EventParam(
      "collectionId",
      ethereum.Value.fromAddress(collectionId)
    )
  )
  offerClosedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  offerClosedEvent.parameters.push(
    new ethereum.EventParam(
      "pieceID",
      ethereum.Value.fromUnsignedBigInt(pieceID)
    )
  )
  offerClosedEvent.parameters.push(
    new ethereum.EventParam(
      "offerID",
      ethereum.Value.fromUnsignedBigInt(offerID)
    )
  )

  return offerClosedEvent
}

export function createOfferCreatedEvent(
  collectionId: Address,
  offerIndex: BigInt,
  creator: Address,
  pieceID: BigInt,
  supply: BigInt,
  price: BigInt
): OfferCreated {
  let offerCreatedEvent = changetype<OfferCreated>(newMockEvent())

  offerCreatedEvent.parameters = new Array()

  offerCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "collectionId",
      ethereum.Value.fromAddress(collectionId)
    )
  )
  offerCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "offerIndex",
      ethereum.Value.fromUnsignedBigInt(offerIndex)
    )
  )
  offerCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  offerCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "pieceID",
      ethereum.Value.fromUnsignedBigInt(pieceID)
    )
  )
  offerCreatedEvent.parameters.push(
    new ethereum.EventParam("supply", ethereum.Value.fromUnsignedBigInt(supply))
  )
  offerCreatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return offerCreatedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPiecePurchasedEvent(
  collectionId: Address,
  offerIndex: BigInt,
  pieceID: BigInt,
  amount: BigInt,
  buyer: Address
): PiecePurchased {
  let piecePurchasedEvent = changetype<PiecePurchased>(newMockEvent())

  piecePurchasedEvent.parameters = new Array()

  piecePurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "collectionId",
      ethereum.Value.fromAddress(collectionId)
    )
  )
  piecePurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "offerIndex",
      ethereum.Value.fromUnsignedBigInt(offerIndex)
    )
  )
  piecePurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "pieceID",
      ethereum.Value.fromUnsignedBigInt(pieceID)
    )
  )
  piecePurchasedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  piecePurchasedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )

  return piecePurchasedEvent
}
