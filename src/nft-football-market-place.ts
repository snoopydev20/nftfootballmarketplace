import { BigInt, store } from "@graphprotocol/graph-ts"
import {
  CollectionApproChanged,
  OfferClosed,
  OfferCreated,
  OwnershipTransferred,
  PiecePurchased
} from "../generated/NFTFootballMarketPlace/NFTFootballMarketPlace"
import { 
  OfferEntity,
  TradeHistoryEntity,
  WCollectionEntity
 } from "../generated/schema"

export function handleCollectionApproChanged(
  event: CollectionApproChanged
): void {
  let entityId = "wcollection_" + event.params.collection.toHex()
  
  if (!event.params.approved) {
    store.remove('WCollectionEntity', entityId)
  } else {
    let entity = new WCollectionEntity(entityId)

    entity.timestamp = event.block.timestamp
    entity.collection = event.params.collection

    entity.save()
  }
}

export function handleOfferClosed(event: OfferClosed): void {
  // remove offer entity 

  let entityId = `footballmarketplace_offer_${event.params.offerID.toHex()}`
  store.remove('OfferEntity', entityId)

   // trading history entity
   let tradHisEntityId = event.transaction.hash.toHexString() + "-" + event.transactionLogIndex.toString()
   let tradHisEntity = new TradeHistoryEntity(tradHisEntityId)
   tradHisEntity.offerId = event.params.offerID
   tradHisEntity.timestamp = event.block.timestamp
   tradHisEntity.txhash = event.transaction.hash.toHexString()
   tradHisEntity.eventName = "closeOffer"
   tradHisEntity.collection = event.params.collectionId
   tradHisEntity.tokenId = event.params.pieceID
   tradHisEntity.seller = event.params.seller
   tradHisEntity.save()
}

export function handleOfferCreated(event: OfferCreated): void {
  let entityId = `footballmarketplace_offer_${event.params.offerIndex.toHex()}`
  let entity = new OfferEntity(entityId)
  entity.offerId = event.params.offerIndex
  entity.timestamp = event.block.timestamp
  entity.collection = event.params.collectionId
  entity.tokenId = event.params.pieceID
  entity.price = event.params.price
  entity.seller = event.params.creator
  entity.amount = event.params.supply
  entity.save()

  // trading history entity
  let tradHisEntityId = event.transaction.hash.toHexString() + "-" + event.transactionLogIndex.toString()
  let tradHisEntity = new TradeHistoryEntity(tradHisEntityId)
  tradHisEntity.offerId = event.params.offerIndex
  tradHisEntity.timestamp = event.block.timestamp
  tradHisEntity.txhash = event.transaction.hash.toHexString()
  tradHisEntity.eventName = "newOffer"
  tradHisEntity.collection = event.params.collectionId
  tradHisEntity.tokenId = event.params.pieceID
  tradHisEntity.seller = event.params.creator
  tradHisEntity.price = event.params.price
  tradHisEntity.amount = event.params.supply

  tradHisEntity.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {

}

export function handlePiecePurchased(event: PiecePurchased): void {
  // remove old offer entity and update with new
  let saleEntityId = `footballmarketplace_offer_${event.params.offerIndex.toHex()}`
  // store.remove('OfferEntity', saleEntityId)
  let entity = OfferEntity.load(saleEntityId);
  
  if(entity){
    let seller = entity.seller
    let price = entity.price
    let existingAmount = entity.amount;
    entity.amount = existingAmount.minus(event.params.amount)
    entity.save()

     // trading history entity
    let tradHisEntityId = event.transaction.hash.toHexString() + "-" + event.transactionLogIndex.toString()
    let tradHisEntity = new TradeHistoryEntity(tradHisEntityId)
    tradHisEntity.offerId = event.params.offerIndex
    tradHisEntity.timestamp = event.block.timestamp
    tradHisEntity.txhash = event.transaction.hash.toHexString()
    tradHisEntity.eventName = "purchaseNft"
    tradHisEntity.collection = event.params.collectionId
    tradHisEntity.tokenId = event.params.pieceID
    tradHisEntity.seller = seller
    tradHisEntity.buyer = event.params.buyer
    tradHisEntity.price = price
    tradHisEntity.amount = event.params.amount
    tradHisEntity.save()
  }
}
