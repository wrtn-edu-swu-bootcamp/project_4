/**
 * 용어 데이터 통합 관리
 * 모든 용어 JSON 파일을 불러와서 하나로 통합
 */

import interestRateTerms from './terms/interest-rate.json';
import productStructureTerms from './terms/product-structure.json';
import taxCostTerms from './terms/tax-cost.json';
import depositProtectionTerms from './terms/deposit-protection.json';
import specialProductsTerms from './terms/special-products.json';
import rateBasicsTerms from './terms/rate-basics.json';
import taxBasicsTerms from './terms/tax-basics.json';

/**
 * 각 용어에 카테고리 추가
 */
function addCategoryToTerms(termsData) {
  const category = termsData.category || '금융 용어';
  return termsData.terms.map(term => ({
    ...term,
    category,
  }));
}

/**
 * 모든 용어를 하나의 배열로 통합
 */
export function getAllTermsData() {
  const allTerms = [
    ...addCategoryToTerms(interestRateTerms),
    ...addCategoryToTerms(productStructureTerms),
    ...addCategoryToTerms(taxCostTerms),
    ...addCategoryToTerms(depositProtectionTerms),
    ...addCategoryToTerms(specialProductsTerms),
    ...addCategoryToTerms(rateBasicsTerms),
    ...addCategoryToTerms(taxBasicsTerms),
  ];

  return allTerms;
}

/**
 * 카테고리별 용어 수
 */
export function getTermsStats() {
  return {
    '금리 관련': interestRateTerms.terms.length,
    '상품 구조': productStructureTerms.terms.length,
    '세금 및 비용': taxCostTerms.terms.length,
    '예금 보호': depositProtectionTerms.terms.length,
    '특수 상품': specialProductsTerms.terms.length,
    '금리': rateBasicsTerms.terms.length,
    '세금': taxBasicsTerms.terms.length,
    총계: getAllTermsData().length,
  };
}

/**
 * 카테고리별로 그룹화된 용어
 */
export function getTermsByCategory() {
  return {
    '금리 관련': interestRateTerms.terms,
    '상품 구조': productStructureTerms.terms,
    '세금 및 비용': taxCostTerms.terms,
    '예금 보호': depositProtectionTerms.terms,
    '특수 상품': specialProductsTerms.terms,
    '금리': rateBasicsTerms.terms,
    '세금': taxBasicsTerms.terms,
  };
}

export default {
  getAllTermsData,
  getTermsStats,
  getTermsByCategory,
};
