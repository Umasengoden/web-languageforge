<?php
namespace libraries\shared\scripts\migration;

use models\ActivityModel;

use models\dto\ActivityListDto;

require_once APPPATH . 'models/TextModel.php';
require_once APPPATH . 'models/QuestionModel.php';

use models\QuestionModel;
use models\TextModel;
use models\ProjectListModel;
use models\ProjectModel;

class FixActivityMissingQuestionTitles
{
    public function run()
    {
        $message = '';
        $projectlist = new ProjectListModel();
        $projectlist->read();
        $projectIds = array_map(function ($e) { return $e['id'];}, $projectlist->entries);

        $emptyQuestionTitles = 0;

        foreach ($projectIds as $projectId) {
            $project = new ProjectModel($projectId);

            $activityEntries = ActivityListDto::getActivityForProject($project);
            foreach ($activityEntries as $activity) {
                if (key_exists('questionRef', $activity) && key_exists('question', $activity['content'])) {
                    $questionId = $activity['questionRef'];
                    $questionTitle = $activity['content']['question'];
                    if ($questionTitle == '') {
                        $emptyQuestionTitles++;
                        $questionModel = new QuestionModel($project, $questionId);
                        $activityModel = new ActivityModel($project, $activity['id']);
                        $newTitle = $questionModel->getTitleForDisplay();
                        $activityModel->actionContent['question'] = $newTitle;
                        $message .= "Fixing activity " . $activity['action'] . " with title '" . $newTitle . "'\n";
                        $activityModel->write();
                    }
                }
            }
        }

        if ($emptyQuestionTitles > 0) {
            $message .= "\n\nFixed up $emptyQuestionTitles empty question titles in the activity log\n\n";
        } else {
            $message .= "\n\nNo empty question titles were found in the activity log \n\n";
        }

        return $message;
    }
}