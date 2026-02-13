const llmService = require("../services/llmService");
const logger = require("../utils/logger");

exports.invokeLLM = async (req, res) => {
  try {
    logger.info("LLM API called", { userId: req.user?.id }, new Date());

    const result = await llmService.invokeLLM(req.body);
    logger.info("LLM API Done", new Date());
    res.status(200).json(result);
  } catch (err) {
    logger.error("LLM API failed", err);
    res.status(500).json({
      message: err.message || "AI generation failed"
    });
  }
};
